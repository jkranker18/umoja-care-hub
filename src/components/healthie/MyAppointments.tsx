import { useState } from 'react';
import { format, parseISO, differenceInMinutes, isPast, isValid } from 'date-fns';
import { useHealthieAppointments } from '@/hooks/useHealthieAppointments';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  RefreshCw, 
  ExternalLink,
  User,
  AlertCircle,
  CalendarX
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface MyAppointmentsProps {
  userId: string;
}

export function MyAppointments({ userId }: MyAppointmentsProps) {
  const { appointments, loading, error, refetch } = useHealthieAppointments({ userId });
  const [dialInOpen, setDialInOpen] = useState(false);
  const [selectedDialIn, setSelectedDialIn] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleJoinCall = (appointment: typeof appointments[0]) => {
    // Check for video URLs
    if (appointment.zoom_join_url) {
      window.open(appointment.zoom_join_url, '_blank');
    } else if (appointment.external_videochat_url) {
      window.open(appointment.external_videochat_url, '_blank');
    }
  };

  const handleViewDialIn = (dialInInfo: string) => {
    setSelectedDialIn(dialInInfo);
    setDialInOpen(true);
  };

  const safeParseDate = (dateStr: string | undefined | null): Date | null => {
    if (!dateStr) return null;
    try {
      const parsed = parseISO(dateStr);
      return isValid(parsed) ? parsed : null;
    } catch {
      return null;
    }
  };

  const isJoinable = (appointment: typeof appointments[0]) => {
    const startTime = safeParseDate(appointment.start);
    const endTime = safeParseDate(appointment.end);
    if (!startTime || !endTime) return false;
    
    const now = new Date();
    const minutesUntilStart = differenceInMinutes(startTime, now);
    // Allow joining 15 minutes before until end time
    return minutesUntilStart <= 15 && !isPast(endTime);
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <Badge className="bg-success/10 text-success border-success/20">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'completed':
        return <Badge className="bg-muted text-muted-foreground">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getContactIcon = (contactType: string) => {
    if (contactType?.toLowerCase().includes('video')) {
      return <Video className="h-4 w-4" />;
    }
    if (contactType?.toLowerCase().includes('phone')) {
      return <Phone className="h-4 w-4" />;
    }
    return <Calendar className="h-4 w-4" />;
  };

  if (loading && appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            My Appointments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 border rounded-lg space-y-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-60" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Check if error is due to token expiration
  const isTokenExpired = error?.toLowerCase().includes('invalid') || 
                         error?.toLowerCase().includes('api key');

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            My Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <p className="font-medium">
              {isTokenExpired ? 'Session Expired' : 'Unable to load appointments'}
            </p>
            <p className="text-sm">
              {isTokenExpired ? 'Your session has expired. Please reconnect to continue.' : error}
            </p>
            <Button 
              variant={isTokenExpired ? "default" : "outline"} 
              size="sm" 
              onClick={() => isTokenExpired ? window.location.reload() : handleRefresh} 
              className="mt-2"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {isTokenExpired ? 'Reconnect' : 'Try Again'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              My Appointments
            </CardTitle>
            <CardDescription className="mt-1.5">
              View and join your scheduled coaching sessions
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2">
              <CalendarX className="h-10 w-10" />
              <p className="font-medium">No upcoming appointments</p>
              <p className="text-sm">Book a session below to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((appointment) => {
                const startTime = safeParseDate(appointment.start);
                const canJoin = isJoinable(appointment);
                const isVideo = appointment.contact_type?.toLowerCase().includes('video');
                const isPhone = appointment.contact_type?.toLowerCase().includes('phone');
                const hasVideoLink = appointment.zoom_join_url || appointment.external_videochat_url;
                const hasDialIn = appointment.zoom_dial_in_info;

                const formattedDate = startTime 
                  ? `${format(startTime, 'EEEE, MMMM d')} at ${format(startTime, 'h:mm a')}`
                  : 'Date unavailable';

                return (
                  <div 
                    key={appointment.id} 
                    className="p-4 border rounded-lg space-y-3 hover:bg-muted/50 transition-colors"
                  >
                    {/* Date and Status Row */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">
                          {formattedDate}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.appointment_type} ({appointment.length} min)
                        </p>
                      </div>
                      {getStatusBadge(appointment.pm_status)}
                    </div>

                    {/* Provider and Contact Type */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {appointment.provider_name}
                      </span>
                      {isVideo && hasVideoLink ? (
                        <button 
                          onClick={() => handleJoinCall(appointment)}
                          className="flex items-center gap-1.5 text-primary hover:underline cursor-pointer"
                        >
                          <Video className="h-3.5 w-3.5" />
                          {appointment.contact_type}
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          {getContactIcon(appointment.contact_type)}
                          {appointment.contact_type}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      {isVideo && hasVideoLink && (
                        <Button 
                          size="sm" 
                          onClick={() => handleJoinCall(appointment)}
                          className="gap-1.5"
                        >
                          <Video className="h-4 w-4" />
                          Join Call
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      
                      {isPhone && hasDialIn && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewDialIn(appointment.zoom_dial_in_info!)}
                          className="gap-1.5"
                        >
                          <Phone className="h-4 w-4" />
                          View Dial-In
                        </Button>
                      )}

                      {appointment.can_client_reschedule && (
                        <Button size="sm" variant="ghost" className="gap-1.5">
                          <Clock className="h-4 w-4" />
                          Reschedule
                        </Button>
                      )}

                      {appointment.can_client_cancel && (
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive gap-1.5">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dial-In Dialog */}
      <Dialog open={dialInOpen} onOpenChange={setDialInOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Phone Dial-In Information
            </DialogTitle>
            <DialogDescription>
              Use these details to join your appointment by phone
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
              {selectedDialIn}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
