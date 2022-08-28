import { Metric } from "@/interfaces/metric.interface";

export interface Journal{
  id:number;
  name:string;
  metrics:Metric[];
}
