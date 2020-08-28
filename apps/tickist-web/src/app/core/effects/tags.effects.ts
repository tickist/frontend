import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {concatMap, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {
    AddTags,
    DeleteTag,
    QueryTags,
    RequestCreateTag,
    RequestDeleteTag,
    RequestUpdateTag,
    TagActionTypes,
    UpdateTag
} from '../actions/tags.actions';
import {AppStore} from '../../store';
import {Tag} from '@data/tags/models/tags';
import {Update} from '@ngrx/entity';
import {TagService} from '../services/tag.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {selectLoggedInUser} from '../selectors/user.selectors';


@Injectable()
export class TagsEffects {

    @Effect()
    query$ = this.actions$
        .pipe(
            ofType<QueryTags>(TagActionTypes.QUERY_TAGS),
            withLatestFrom(this.store.select(selectLoggedInUser)),
            switchMap(([, user]) => {
                return this.db.collection(
                    'tags',
                    ref => ref.where('author', '==', user.id))
                    .stateChanges();
            }),
            concatMap(actions => {
                const addedTags: Tag[] = [];
                let deletedTagId: string;
                let updatedTag: Update<Tag>;
                console.log(actions);
                actions.forEach((action => {
                    if (action.type === 'added') {
                        const data: any = action.payload.doc.data();
                        addedTags.push(new Tag({
                            id: action.payload.doc.id,
                            ...data
                        }));
                    }
                    if (action.type === 'modified') {
                        const data: any = action.payload.doc.data();
                        updatedTag = {
                            id: action.payload.doc.id,
                            changes: new Tag({...data})
                        };
                    }
                    if (action.type === 'removed') {
                        deletedTagId = action.payload.doc.id;
                    }
                }));
                const returnsActions = [];
                if (addedTags.length > 0) {
                    returnsActions.push( new AddTags({tags: addedTags}));
                }
                if (updatedTag) {
                    returnsActions.push(new UpdateTag({tag: updatedTag}));
                }
                if (deletedTagId) {
                    returnsActions.push(new DeleteTag({tagId: deletedTagId}));
                }
                return returnsActions;
            })
        );


    // @Effect()
    // addTags$ = this.actions$
    //     .pipe(
    //         ofType<RequestsAllTags>(TagActionTypes.REQUEST_ALL_TAGS),
    //         withLatestFrom(this.store.pipe(select(allTagsLoaded))),
    //         filter(([action, allTagsLoadedValue]) => !allTagsLoadedValue),
    //         mergeMap(() => this.tagsService.loadTags()),
    //         map(tags => {
    //             debugger;
    //             return new AddTags({tags: tags})
    //         })
    //     );

    @Effect({dispatch: false})
    createTag$ = this.actions$
        .pipe(
            ofType<RequestCreateTag>(TagActionTypes.REQUEST_CREATE_TAG),
            mergeMap(action => this.tagsService.createTag(action.payload.tag)),
        );

    @Effect({dispatch: false})
    updateTag$ = this.actions$
        .pipe(
            ofType<RequestUpdateTag>(TagActionTypes.REQUEST_UPDATE_TAG),
            mergeMap((action) => this.tagsService.updateTag(<Tag> action.payload.tag.changes))
        );

    @Effect({dispatch: false})
    deleteTag$ = this.actions$
        .pipe(
            ofType<RequestDeleteTag>(TagActionTypes.REQUEST_DELETE_TAG),
            mergeMap(action => this.tagsService.deleteTag(action.payload.tagId))
        );

    constructor(private actions$: Actions, private tagsService: TagService, private db: AngularFirestore,
                private store: Store, private authFire: AngularFireAuth) {

    }

}

