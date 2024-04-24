import { AlertTriangle } from "lucide-react";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { PageMain } from "../components/PageMain";

export function PageNotFound() {
  return (
    <PageContainer>
      <PageHeader />
      <PageMain>
        <div className="text-stone-400 text-2xl flex flex-col items-center justify-center gap-3 mt-5">
          <AlertTriangle size={76} />
          <span>Página não encontrada</span>
        </div>
      </PageMain>
    </PageContainer>
  );
}
