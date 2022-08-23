export interface Article {
  id:       number;
  title:    string;
  authors:  string[];
  year:     string;
  month:    string;
  typeArticle: string;
  journal:  Journal;
  volume:   string;
  abstract: string;
}

export interface Journal {
  title:        string;
  quartile:     string;
  impactFactor: string;
  hIndex:       string;
  source:       string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toScientificDocument(json: string): Article {
    return JSON.parse(json);
  }

  public static scientificDocumentToJson(value: Article): string {
    return JSON.stringify(value);
  }
}
