import { Component, OnInit } from "@angular/core";
import { EmployeeModel } from "src/models/employee.model";
import { HttpHelperService } from "../services/http-helper.service";

@Component({
    templateUrl: './employee-dashboard.component.html',
    styleUrls: ['./employee-dashboard.component.scss']
})

export class EmployeeDashboardComponent implements OnInit {
    employees: Array<EmployeeModel>;
    max_popularity: number = 5; //assuming max popularity to be 5;
    selectedEmp: EmployeeModel;
    constructor(private _http: HttpHelperService) { }

    ngOnInit(): void {
        this._http.get('assets/EmployeeData.json').subscribe(resp => {
            this.employees = resp.employees;
            this.empClick(this.employees[0]);
            this.selectedEmp = this.employees[0];
            // this.selectedEmp.isSelected = true;
            // this.selectedEmp.isSelected = true;
            this.employees.forEach(((emp: EmployeeModel) => {
                emp.image = '../../assets/images/profile_pics/' + emp.image;
                emp.font_size = this.getEmpFontSize(emp);
            }))
        })
    }

    empClick(emp: EmployeeModel): void {
        this.selectedEmp = emp;
        this.employees.forEach(((_emp: EmployeeModel) => {
            _emp.isSelected = (_emp.name === emp.name) ? true : false;
            _emp.isHighlighted = emp.colleagues.findIndex(empName => empName === _emp.name) > -1 ? true : false;
        }))
    }

    popularityChange(val): void {
        this.selectedEmp.font_size = this.getEmpFontSize(this.selectedEmp);
    }

    private getEmpFontSize(emp): number {
        return (emp.popularity / this.max_popularity) * 25
    }
}