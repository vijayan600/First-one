import { motion } from "framer-motion";
import logo from "../assets/logo.png";

function Loader({ done }) {
  return (
    <motion.div
      className="fixed inset-0 bg-white flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.img
        src={logo}
        alt="SHA Logo"
        className="w-28 h-28"
        initial={{ scale: 0.6, rotate: 0, opacity: 0 }}
        animate={{
          scale: 1,
          rotate: 360,
          opacity: 1,
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
        onAnimationComplete={done}
      />
    </motion.div>
  );
}

export default Loader;
