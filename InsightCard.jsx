import React from 'react';
import { motion } from 'framer-motion';

const InsightCard = ({ title, value, subtitle, icon: Icon, trend, index }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-xl border bg-white dark:bg-[#121214] border-zinc-200 dark:border-zinc-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] p-6 transition-all duration-300"
      data-testid={`insight-card-${index}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <Icon className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
            </div>
          )}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">
              {title}
            </p>
          </div>
        </div>
        {trend && (
          <div className={`text-xs font-mono px-2 py-1 rounded ${
            trend > 0 
              ? 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400' 
              : 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-light tracking-tighter font-mono">{value}</p>
        {subtitle && (
          <p className="text-sm text-muted-foreground leading-relaxed">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

export default InsightCard;
