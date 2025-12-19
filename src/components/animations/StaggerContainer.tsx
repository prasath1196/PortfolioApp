'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    staggerDelay?: number;
}

export default function StaggerContainer({
    children,
    className,
    delay = 0,
    staggerDelay = 0.1,
}: StaggerContainerProps) {
    return (
        <motion.div
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        delayChildren: delay,
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};
