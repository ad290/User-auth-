
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.Frontend_API_URL || 'http://localhost:8000/api';

interface User {
  username: string;
  email: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  country: string;
}

const Welcome = () => {
  const [username, setUsername] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Decode username from JWT token
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload.username);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, [navigate]);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/users/search?term=${searchTerm}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error('Search failed');
      
      const users = await response.json();
      setSearchResults(Array.isArray(users) ? users : [users]);
      setSelectedUser(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Search failed',
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            Welcome, {username}!
          </motion.h1>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Search Users</h2>
            <div className="flex gap-4">
              <Input
                placeholder="Search by username or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>

            <div className="space-y-4">
              {searchResults.map((user) => (
                <motion.div
                  key={user.username}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <Card className="p-4 hover:bg-gray-50 transition-colors">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {selectedUser && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6 bg-white/50 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-4">User Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Username:</span> {selectedUser.username}</p>
                    <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
                    <p><span className="font-medium">Full Name:</span> {selectedUser.fullName}</p>
                    <p><span className="font-medium">Gender:</span> {selectedUser.gender}</p>
                    <p><span className="font-medium">Date of Birth:</span> {new Date(selectedUser.dateOfBirth).toLocaleDateString()}</p>
                    <p><span className="font-medium">Country:</span> {selectedUser.country}</p>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
