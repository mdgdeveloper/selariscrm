import { User } from "lucide-react";

type Props = {
    dashboardType: string;
    dashboardTypePlural?: string;
}

const EmptyDashboard = (props: Props) => {
  return (
    <div className="text-center py-6">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No hay {props.dashboardTypePlural} aún
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Comienza añadiendo un nuevo {props.dashboardType}
            </p>
          </div>
  )
}

export default EmptyDashboard