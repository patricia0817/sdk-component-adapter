import {Observable} from 'rxjs';
import {map, distinctUntilChanged} from 'rxjs/operators';
import {MeetingControlState} from '@webex/component-adapter-interfaces';
import MeetingControl from './MeetingControl';

/**
 * Display options of a meeting control.
 *
 * @external MeetingControlDisplay
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L58}
 */

export default class RosterControl extends MeetingControl {
  /**
   * Attempts to toggle roster to the given meeting ID.
   * A roster toggle event is dispatched.
   *
   * @param {string} meetingID  Id of the meeting to toggle roster
   */
  async action(meetingID) {
    await this.adapter.toggleRoster(meetingID);
  }

  /**
   * Returns an observable that emits the display data of a roster control.
   *
   * @param {string} meetingID  Id of the meeting to toggle roster
   * @returns {Observable.<MeetingControlDisplay>} Observable stream that emits display data of the roster control
   */
  display(meetingID) {
    const active = {
      ID: this.ID,
      type: 'TOGGLE',
      state: MeetingControlState.ACTIVE,
      icon: 'participant-list',
      text: 'Hide participants',
      tooltip: 'Hide participants panel',
    };
    const inactive = {
      ID: this.ID,
      type: 'TOGGLE',
      state: MeetingControlState.INACTIVE,
      icon: 'participant-list',
      text: 'Show participants',
      tooltip: 'Show participants panel',
    };

    return this.adapter.getMeeting(meetingID).pipe(
      map(({showRoster}) => (showRoster ? active : inactive)),
      distinctUntilChanged(),
    );
  }
}
