// src/components/AnimatedCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardProps } from '@mui/material';

interface AnimatedCardProps extends CardProps {
  delay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  delay = 0,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card {...props}>
        {children}
      </Card>
    </motion.div>
  );
};
