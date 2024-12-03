import {json} from "@sveltejs/kit";

export function GET() {
    return json(
        [
            {
                name: 'Column 1',
                value: 'value-column-1'
            },
            {
                name: 'Column 2',
                value: 'value-column-2'
            },
            {
                name: 'Column 3',
                value: 'value-column-3'
            }
        ])
}