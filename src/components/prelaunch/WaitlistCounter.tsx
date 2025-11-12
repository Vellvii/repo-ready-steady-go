import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

export const WaitlistCounter = () => {
  const [count, setCount] = useState(0);
  const spring = useSpring(0, { stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  // Fetch initial count
  useEffect(() => {
    const fetchCount = async () => {
      const { count: emailCount, error } = await supabase
        .from('mailing_list_signups')
        .select('*', { count: 'exact', head: true });
      
      if (!error && emailCount !== null) {
        setCount(emailCount);
        spring.set(emailCount);
      }
    };

    fetchCount();
  }, [spring]);

  // Set up realtime subscription for new signups
  useEffect(() => {
    const channel = supabase
      .channel('mailing-list-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mailing_list_signups'
        },
        () => {
          // Increment count when new signup is added
          setCount((prev) => {
            const newCount = prev + 1;
            spring.set(newCount);
            return newCount;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [spring]);

  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div className="relative">
        <motion.div 
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-baskerville"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {display}
        </motion.div>
        <motion.div
          className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl -z-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <p className="text-white/60 text-lg font-medium">
        People on Waitlist
      </p>
    </div>
  );
};
