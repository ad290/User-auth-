
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const API_BASE_URL = import.meta.env.Frontend_API_URL || 'http://localhost:8000/api';

interface UserData {
  username: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  country: string;
}

const UserSearch = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const searchTerm = formData.get('searchTerm');
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login first');
      }

      const response = await fetch(`${API_BASE_URL}/users/search?term=${searchTerm}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        throw new Error(data.message || 'Search failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Search failed',
        variant: "destructive",
      });
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.form 
        onSubmit={handleSubmit}
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-2">
          <Label htmlFor="searchTerm">Search by Username or Email</Label>
          <Input
            id="searchTerm"
            name="searchTerm"
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-offset-2"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </motion.form>

      <AnimatePresence>
        {userData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">User Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Username:</span> {userData.username}</p>
                <p><span className="font-medium">Full Name:</span> {userData.fullName}</p>
                <p><span className="font-medium">Gender:</span> {userData.gender}</p>
                <p><span className="font-medium">Date of Birth:</span> {new Date(userData.dateOfBirth).toLocaleDateString()}</p>
                <p><span className="font-medium">Country:</span> {userData.country}</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserSearch;
