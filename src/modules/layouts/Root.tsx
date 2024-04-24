import { Outlet } from "react-router-dom";
import { PageMain } from "@components/PageMain";
import { PageHeader } from "@components/PageHeader";
import { PageContainer } from "@components/PageContainer";

export function Root() {
  return (
    <PageContainer>
      <PageHeader />
      <PageMain>
        <Outlet />
      </PageMain>
    </PageContainer>
  );
}
