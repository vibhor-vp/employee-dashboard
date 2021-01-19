export class EmployeeModel {
    name: string;
    popularity: number;
    biography: string;
    image: string;
    colleagues: Array<string>;
    font_size?: number;
    isSelected?: boolean;
    isHighlighted?: boolean;
}