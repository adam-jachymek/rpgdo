import { Injectable } from "@nestjs/common";
import { InferSubjects, Ability, AbilityClass, AbilityBuilder, ExtractSubjectType } from "@casl/ability"

type Subjects = InferSubjects<typeof Task | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

class User {
    id: string;
}

class Task {
    id: string;
    authorId: string;
}

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User, task: Task) {
        const { can, cannot, build } = new AbilityBuilder<
            Ability<[Action, Subjects]>
        >(Ability as AbilityClass<AppAbility>);

        if (user.id === task.id) {
            can(Action.Manage, 'all'); // read-write access to everything
        } else {
            can(Action.Read, 'all'); // read-only access to everything
        }

        return build({
            // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}