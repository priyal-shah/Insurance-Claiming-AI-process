import { motion } from "framer-motion";

export function StatCard({ title, value }) {
 return (
  <motion.div
   whileHover={{ y:-5 }}
   className="bg-white/5 p-6 rounded-3xl"
  >
   <p className="text-slate-400">{title}</p>
   <h2 className="text-4xl font-bold">{value}</h2>
  </motion.div>
 );
}