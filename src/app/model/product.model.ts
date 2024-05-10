export class Product {
    _id?: string;
    title!: string;
    description!: string;
    price!: number;
    discount!: number;
    userImage!: boolean;
    image!: string;
    category!: any;
    additionalInfo!: [{
        title: '',
        description: ''
    }];
    frame?: '';

    availablePrintSize!: [{
        _id?: any,
        width: 0,
        height: 1
    }];

    totalrating?: number;

    availablePrintType!: any[];
    amount?: number;
    reviews?: [{ rating: number, user: any, comment: string }]
}