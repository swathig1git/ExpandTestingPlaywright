import { Locator, Page } from "playwright-core";

export class DynamicTablePage{
    page: Page;
    rows: Locator;
    cpuUsage: Locator;

    
    constructor(page: Page){
        this.page = page;
        this.rows = page.getByRole('row');
        this.cpuUsage = page.getByText('Chrome CPU');
        
    
    }

    async getCPUUsagefromTable(browserName: string): Promise<string>{


        const rowCount = await this.rows.count();
        let cpuColumnNum:number = 0;
        for(let i=0;i<rowCount; i++)
        {
            const row = await this.rows.nth(i);
            let cells = await row.getByRole("cell");

            if (i===0)
            {
                const columnCount = await cells.count();
                for (let j=0;j<columnCount;j++)
                {
                    if (await cells.nth(j).textContent() === "CPU")
                        cpuColumnNum = j;
                }
            }

            let browserNameInCell = await cells.nth(0).textContent();
            if (browserNameInCell === browserName) 
            {
                return await cells.nth(cpuColumnNum).textContent() ?? "";
            }
        }

        return "";

    }

    async getChromeCPUUsage(){

       
        let cpuMessage:string = await this.cpuUsage.textContent() ?? "";
        const parts = cpuMessage.split(': ');
        return parts[1];
            

    }


    async goTo(): Promise<void>{
        await this.page.goto("https://practice.expandtesting.com/dynamic-table");
    }

}