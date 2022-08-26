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

/*export interface PublicationAuthor{
  id: number;
  articleId: number;
  authorId: number;
  authors:Author[];
  articles:Article[];
}*/

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

export interface Metric{
  id:number;
  name:string;
  score:string;
  year:number;
  source:string;
}


/*
export interface Journal {
  title:        string;
  quartile:     string;
  impactFactor: string;
  hIndex:       string;
  source:       string;
}*/

export interface Journal{
  id:number;
  name:string;
  metrics:Metric[];
}


