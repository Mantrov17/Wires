import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "../widgets/Layout";
import { MainPage } from "../pages/MainPage";

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
