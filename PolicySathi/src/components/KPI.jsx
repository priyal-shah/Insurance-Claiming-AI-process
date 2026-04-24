import { motion } from "framer-motion";

export default function KPI({ title, value }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white/5 border border-white/10 p-6 rounded-3xl shadow-glow"
    >

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-2">
        {value}
      </h2>

    </motion.div>
  );
}