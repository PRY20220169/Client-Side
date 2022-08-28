import { Article } from "@/interfaces/article.interface";
import { Metric } from "@/interfaces/metric.interface";

export interface Author {
  id:number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  organizations: string[];
  metrics:Metric[];
  articles:Article[];
}