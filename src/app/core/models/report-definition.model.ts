export class ReportDefinition {
    idReport: number;
    description: string;
    date: Date;
    user: string;
    reporter: string;

    constructor(idReport: number, description: string, date: Date, user: string, reporter: string) {
        this.idReport = idReport;
        this.description = description;
        this.date = date;
        this.user = user;
        this.reporter = reporter;
    }
}
