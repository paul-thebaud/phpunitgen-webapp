import { SerializerI } from "@/container/contracts/serializerI";
import { injectable } from "inversify";

/**
 * Class JsonSerializer.
 *
 * SerializerI using JSON parse/stringify.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
@injectable()
export class JsonSerializer implements SerializerI {
    /**
     * @inheritDoc
     */
    public deserialize(string: string): object {
        return JSON.parse(string);
    }

    /**
     * @inheritDoc
     */
    public serialize(object: object): string {
        return JSON.stringify(object);
    }
}
