import { Author } from "@/interfaces/author.interface";
import { Journal } from "@/interfaces/journal.interface";

export interface Article {
  id:       number;
  title:    string;
  //authors:string[];
  authors:  Author[];//
  publicationDate: Date;
  //year:     string;
  //month:    string;
  typeArticle: string;

  journalId: number;
  journal:  Journal;
  volume:   string;
  //abstract:string;
  description: string;
  keywords: string[];
  categories: string[];
  numberOfCitations: number;
  numberOfReferences: number;
}




