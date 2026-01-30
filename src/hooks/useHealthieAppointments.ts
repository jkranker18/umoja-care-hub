import { useQuery, gql } from '@apollo/client';
import { HealthieAppointment, AppointmentsQueryResult } from '@/types/healthie';

const GET_USER_APPOINTMENTS = gql`
  query GetUserAppointments($user_id: ID!, $is_upcoming: Boolean) {
    appointments(user_id: $user_id, is_upcoming: $is_upcoming) {
      id
      date
      start
      end
      length
      appointment_type {
        name
      }
      appointment_label
      contact_type
      provider {
        id
        name
      }
      zoom_join_url
      external_videochat_url
      zoom_dial_in_info
      pm_status
      can_client_cancel
      can_client_reschedule
    }
  }
`;

interface UseHealthieAppointmentsOptions {
  userId: string;
  isUpcoming?: boolean;
}

interface TransformedAppointment extends Omit<HealthieAppointment, 'appointment_type'> {
  appointment_type: string;
}

export function useHealthieAppointments({ userId, isUpcoming = true }: UseHealthieAppointmentsOptions) {
  const { data, loading, error, refetch } = useQuery<{ appointments: any[] }>(
    GET_USER_APPOINTMENTS,
    {
      variables: {
        user_id: userId,
        is_upcoming: isUpcoming,
      },
      skip: !userId,
      fetchPolicy: 'cache-and-network',
    }
  );

  // Transform the response to flatten nested objects and sort chronologically
  const appointments: TransformedAppointment[] = (data?.appointments || [])
    .map((apt) => ({
      ...apt,
      appointment_type: apt.appointment_type?.name || apt.appointment_label || 'Appointment',
      provider_name: apt.provider?.name || 'Health Coach',
    }))
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  return {
    appointments,
    loading,
    error: error ? error.message : null,
    refetch,
  };
}
