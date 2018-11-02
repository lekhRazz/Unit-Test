const lib=require('../lib');
const db=require('../db');
const mail=require('../mail');

describe('absolute',()=>{


    it('absolute - should return a positive number if input is positive',() => {
        // throw new Error('Something Failed.');
    const result=lib.absolute(1);
        expect(result).toBe(1);
    });


    it('absolute - should return a  positive number if input is negative',() => {
        // throw new Error('Something Failed.');
    const result=lib.absolute(-1);
        expect(result).toBe(1);
    });



    it('absolute - should return a  zero number if input is zero',() => {
        // throw new Error('Something Failed.');
    const result=lib.absolute(0);
        expect(result).toBe(0);
    });
});
//Testing string
describe('greet',()=>{
    it('should return the greeting message ',()=>{
        const result=lib.greet('Mosh');
        expect(result).toMatch(/Mosh/);
        expect(result).toContain('Mosh');
    });
});
//Test array
describe('getCurrencies',()=>{
    it('should return supported currencies',()=>{
        const result=lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['EUR','USD','AUD']));
    })
});

//Testing objects
describe('getProudcts',()=>{
    it('should return product with the given id.',()=>{
        const result=lib.getProduct(1);
        expect(result).toEqual({id:1,price:10});
        expect(result).toMatchObject({id:1,price:10});
    })
});


//Testing exceptions
describe('registerUser',()=>{
    it('should throw if user name is falsy',()=>{
      
        const args=[null,undefined,NaN,'',0,false];
        args.forEach(a =>{
            expect(()=>{lib.registerUser(a)}).toThrow();

        })
       
    });
    it('should return a user object if valid username is passed',()=>{
        const result=lib.registerUser('lekh');
        expect(result).toMatchObject({username:'lekh'});
        expect(result.id).toBeGreaterThan(0);
    });
});

//Testing mock function
describe('applyDisount',()=>{
    it('should apply 10% discount of customer has more than 10 points',()=>{
        db.getCustomerSync=function(customerId){
            console.log('Fake reading customer....');
            return {id:customerId,points:20}
        }
        const order={customerId:1,totalPrice:10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
})

describe('notifyCustomer',()=>{
    it('should send email to the customer',()=>{
        db.getCustomerSync=function(customerId){
            return {email:'a'}
        };
        let mailSent=false;

        mail.send=function(email,message){
            mailSent=true;
        }
        lib.notifyCustomer({customerId:1});
        expect(mailSent).toBe(true);
    });
})