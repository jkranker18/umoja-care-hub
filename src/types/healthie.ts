// Healthie API TypeScript interfaces

export interface HealthieAppointment {
  id: string;
  date: string; // ISO date string
  start: string; // ISO datetime with timezone
  end: string; // ISO datetime with timezone
  length: number; // Duration in minutes
  appointment_type: string;
  appointment_label: string;
  contact_type: 'Phone Call' | 'Video Call' | 'In-Person' | string;
  provider_name: string;
  provider?: {
    id: string;
    name: string;
  };
  zoom_join_url?: string;
  external_videochat_url?: string;
  zoom_dial_in_info?: string;
  zoom_dial_in_numbers_json?: string;
  pm_status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed' | 'No Show' | string;
  can_client_cancel: boolean;
  can_client_reschedule: boolean;
}

export interface AppointmentsQueryResult {
  appointments: HealthieAppointment[];
}
