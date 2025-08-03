import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Styles/ProductPolicies.css";


export const ProductPolicies = ({ policies = [] }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="policy-container">
      <div className="policy-header" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="policy-title">Políticas del producto</h2>
        <span className="toggle-text">
          {isOpen ? "Ocultar" : "Mostrar"}
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="policy-grid"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {policies.map((policy, index) => (
              <div key={index} className="policy-card">
                <h3 className="card-title">{policy.title}</h3>
                <p className="card-description">{policy.description}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



