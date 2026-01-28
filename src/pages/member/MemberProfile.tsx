import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, MapPin, Check, Pencil, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSupportCases } from '@/hooks/useSupportCases';
import { StatusPill } from '@/components/shared/StatusPill';
import { format } from 'date-fns';

export default function MemberProfile() {
  const { members } = useApp();
  const { toast } = useToast();
  const { cases } = useSupportCases();
  const member = members[0];

  // Address state
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    street: '1234 Oak Street',
    apt: 'Apt 2B',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90012',
  });
  const [tempAddress, setTempAddress] = useState(address);

  // Phone state
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phone, setPhone] = useState('(213) 555-0147');
  const [tempPhone, setTempPhone] = useState(phone);

  const handleSaveAddress = () => {
    setAddress(tempAddress);
    setIsEditingAddress(false);
    toast({
      title: "Address updated",
      description: "Your address has been saved successfully.",
    });
  };

  const handleCancelAddress = () => {
    setTempAddress(address);
    setIsEditingAddress(false);
  };

  const handleSavePhone = () => {
    setPhone(tempPhone);
    setIsEditingPhone(false);
    toast({
      title: "Phone number updated",
      description: "Your phone number has been saved successfully.",
    });
  };

  const handleCancelPhone = () => {
    setTempPhone(phone);
    setIsEditingPhone(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and contact details.
          </p>
        </div>

        {/* Member Info Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle>{member?.firstName} {member?.lastName}</CardTitle>
                <CardDescription>{member?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Phone Number Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Phone Number</CardTitle>
              </div>
              {!isEditingPhone && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsEditingPhone(true)}
                >
                  <Pencil className="h-4 w-4 mr-1.5" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isEditingPhone ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    placeholder="(555) 555-5555"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSavePhone}>
                    <Check className="h-4 w-4 mr-1.5" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancelPhone}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-lg">{phone}</p>
            )}
          </CardContent>
        </Card>

        {/* Address Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Delivery Address</CardTitle>
              </div>
              {!isEditingAddress && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsEditingAddress(true)}
                >
                  <Pencil className="h-4 w-4 mr-1.5" />
                  Edit
                </Button>
              )}
            </div>
            <CardDescription>This is where your meals will be delivered.</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditingAddress ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={tempAddress.street}
                    onChange={(e) => setTempAddress({ ...tempAddress, street: e.target.value })}
                    placeholder="123 Main St"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apt">Apartment, Suite, etc. (optional)</Label>
                  <Input
                    id="apt"
                    value={tempAddress.apt}
                    onChange={(e) => setTempAddress({ ...tempAddress, apt: e.target.value })}
                    placeholder="Apt 4B"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                  <div className="sm:col-span-3 space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={tempAddress.city}
                      onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })}
                      placeholder="City"
                    />
                  </div>
                  <div className="sm:col-span-1 space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={tempAddress.state}
                      onChange={(e) => setTempAddress({ ...tempAddress, state: e.target.value })}
                      placeholder="CA"
                      maxLength={2}
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      value={tempAddress.zip}
                      onChange={(e) => setTempAddress({ ...tempAddress, zip: e.target.value })}
                      placeholder="90210"
                      maxLength={10}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveAddress}>
                    <Check className="h-4 w-4 mr-1.5" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancelAddress}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-lg">
                <p>{address.street}</p>
                {address.apt && <p>{address.apt}</p>}
                <p>{address.city}, {address.state} {address.zip}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Cases Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg">My Cases</CardTitle>
            </div>
            <CardDescription>Support requests you've submitted.</CardDescription>
          </CardHeader>
          <CardContent>
            {cases.length > 0 ? (
              <div className="space-y-3">
                {cases.map((supportCase) => (
                  <div 
                    key={supportCase.caseNumber} 
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{supportCase.caseNumber}</p>
                        <p className="text-xs text-muted-foreground">
                          {supportCase.subject.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} • {format(new Date(supportCase.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <StatusPill status={supportCase.status === 'open' ? 'pending' : supportCase.status === 'resolved' ? 'completed' : 'active'} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No support cases yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}