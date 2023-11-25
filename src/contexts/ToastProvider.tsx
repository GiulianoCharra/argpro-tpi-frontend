import React, { createContext, ReactNode, useContext, useState } from "react";
import TaskToast from "../components/TaskToast/TaskToast.js";

// Definir la forma de la configuración del toast
interface ToastConfig {
  message: string;
  type: string;
}

// Propiedades del contexto del Toast
interface ToastContextProps {
  showToastMessage: (message: string, type: string) => void;
  hideToastMessage: () => void;
}

// Propiedades del proveedor de Toast
interface ToastProviderProps {
  children: ReactNode;
}

// Crear el contexto del Toast
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Hook para utilizar el contexto del Toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Proveedor de Toast
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  // Estado para la configuración del toast
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);

  // Función para mostrar el toast
  const showToastMessage = (message: string, type: string) => {
    setToastConfig({ message, type });
  };

  // Función para ocultar el toast
  const hideToastMessage = () => {
    setToastConfig(null);
  };

  return (
    <ToastContext.Provider value={{ showToastMessage, hideToastMessage }}>
      {children}
      {toastConfig && <TaskToast config={toastConfig} />}
    </ToastContext.Provider>
  );
};

export default { ToastProvider, useToast };
