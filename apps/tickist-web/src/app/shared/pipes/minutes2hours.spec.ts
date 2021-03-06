import {Minutes2hoursPipe} from './minutes2hours';


describe('Minutes2hoursPipe', () => {
    let pipe: Minutes2hoursPipe;
    beforeEach(() => {
        pipe = new Minutes2hoursPipe();
    });

    it('Minutes2hoursPipe should work', () => {
        expect(pipe.transform(180)).toBe('3h');
        expect(pipe.transform(178)).toBe('2h 58m');
        expect(pipe.transform(23)).toBe('23m');
        expect(pipe.transform(undefined)).toBeFalsy();
        expect(pipe.transform(null)).toBeFalsy();
    });
});
