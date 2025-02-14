
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';

const Index = () => {
  const [view, setView] = useState<'login' | 'register'>('login');
  const { toast } = useToast();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 backdrop-blur-lg bg-white/90 border border-gray-200">
        <div className="space-y-6">
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              variant={view === 'login' ? "default" : "outline"}
              onClick={() => setView('login')}
              className="transition-all duration-300"
            >
              Login
            </Button>
            <Button 
              variant={view === 'register' ? "default" : "outline"}
              onClick={() => setView('register')}
              className="transition-all duration-300"
            >
              Register
            </Button>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            {view === 'login' && <LoginForm />}
            {view === 'register' && <RegisterForm />}
          </motion.div>
        </div>
      </Card>
    </div>
  );
};

export default Index;
