import { PipeTransform } from "@angular/core";

@Pipe({
    name:'filter'
})

export class FilterPipe implements PipeTransform{
    transform(value: string[], args: string):string[] {
        const result:string[]=[]
        for (const value of values){
            if(value.indexOf(args)>-1){
                result=[...result,value]
            }
        }
    }
}