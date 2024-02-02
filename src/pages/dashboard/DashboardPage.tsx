import { useQuery } from "@tanstack/react-query";
import { ApiException, Fetcher } from "../../lib/fetcher";
import { Task } from "../../@types";
import DataWidget from "../../components/shared/DataWidget";

const DashboardPage = () => {
  const { isLoading, data: tasksData, error, refetch } = useQuery<any, ApiException, { data: Task[] }>({
    queryKey: ["tasks"],
    queryFn: () => Fetcher.get("/tasks/mine"),
    retry: false,
  });
  return (
    <div className="mt-1">

      <DataWidget isLoading={isLoading} error={error} retry={refetch}>
        <div className="grid-cols-4 grid gap-5">
          {[
            { title: "Total Tasks", number: tasksData?.data?.length, className: '' },
            { title: "Completed Tasks", number: tasksData?.data?.filter(task => task.completed)?.length, className: 'border-green-600 ' },
            { title: "Ongoing Tasks", number: tasksData?.data?.filter(task => !task.completed)?.length, className: 'border-red-700' }
          ].map((data, index) => {
            return <div key={index} className={"bg-white p-3 border-l-[3px] border-primary flex flex-col items-start " + data.className}>
              <p className="font-bold text-3xl text-primary">{data.number}+</p>
              <p className="text-sm">{data.title}</p>
            </div>
          })}
        </div>
      </DataWidget>
    </div>
  );
}

export default DashboardPage;