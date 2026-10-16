export interface CreateBusiness {
  name: string;
  description: string;
}

export interface BusinessOverview{
  id:string,
  name:string,
  description:string,
  status:"ACTIVE"|"INACTIVE",
  total_clients:number,
  total_active_clients:number,
  total_income:number,
  total_paid:number
  total_due:number,
  created_at:string
}