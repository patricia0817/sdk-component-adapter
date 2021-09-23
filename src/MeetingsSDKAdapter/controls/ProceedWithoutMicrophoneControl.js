import {
  Observable,
} from 'rxjs';
import MeetingControl from './MeetingControl';

/**
 * Display options of a meeting control.
 *
 * @external MeetingControlDisplay
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L58}
 */

export default class ProceedWithoutMicrophoneControl extends MeetingControl {
  /**
   * Calls the adapter ignoreAudioAccessPrompt method.
   *
   * @param {string} meetingID  Meeting ID
   */
  async action(meetingID) {
    await this.adapter.ignoreAudioAccessPrompt(meetingID);
  }

  /**
   * Returns an observable that emits the display data of the proceed without microphone control.
   *
   * @param {string} meetingID  Meeting ID
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data of proceed without microphone control
   */
  display(meetingID) {
    const sdkMeeting = this.adapter.fetchMeeting(meetingID);

    const control$ = new Observable((observer) => {
      if (sdkMeeting) {
        observer.next({
          ID: this.ID,
          text: 'Proceed without microphone',
          tooltip: 'This setting cannot be changed once the meeting starts.',
          hint: 'This setting cannot be changed once the meeting starts.',
        });
        observer.complete();
      } else {
        observer.error(new Error(`Could not find meeting with ID "${meetingID}" to add proceed without microphone control`));
      }
    });

    return control$;
  }
}
