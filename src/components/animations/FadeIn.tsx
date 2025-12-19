'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    fullWidth?: boolean;
    id?: string;
}

export default function FadeIn({
    children,
    className,
    delay = 0,
    direction = 'up',
    fullWidth = false,
    id,
}: FadeInProps) {
    const directionOffset = {
        up: 20,
        down: -20,
        left: 20,
        right: -20,
    };

    const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';

    return (
        <motion.div
            initial={{
                opacity: 0,
                [axis]: directionOffset[direction]
            }}
            whileInView={{
                opacity: 1,
                [axis]: 0
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.5,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98], // smooth spring-like ease
            }}
            id={id}
            className={cn(fullWidth ? 'w-full' : '', className)}
        >
            {children}
        </motion.div>
    );
}
