import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster toastOptions={{ duration: 6000, style: { padding: 0, boxShadow: 'none', backgroundColor: 'transparent' }, }} />
    </QueryClientProvider>
  )
}

export default App;
