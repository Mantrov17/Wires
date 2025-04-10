// src/app/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "../widgets/Layout/Layout";
import { MainPage } from "../pages/MainPage/MainPage";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <MainPage />
      </Layout>
    </QueryClientProvider>
  );
};
