/*
Reference: https://github.com/jordems/black-jack-sim/blob/6c496de7171ae01a323b6e4173029ee50bc2d926/libs/api/feature/table/src/lib/shared/id.validator.ts
 */
import { registerDecorator } from 'class-validator';

function IsEntityId(prefix: string) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isEntityId',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [prefix],
            validator: {
                validate(value: string) {
                    return typeof value === 'string' && value.startsWith(`${prefix}_`);
                },
                defaultMessage() {
                    return `'${propertyName}' must start with '${prefix}_'`;
                },
            },
        });
    };
}

export { IsEntityId };
