import {first} from 'rxjs/operators';
import {meetingID, createTestMeetingsSDKAdapter} from '../testHelper';

describe('Audio Control', () => {
  let meetingsSDKAdapter;

  beforeEach(() => {
    meetingsSDKAdapter = createTestMeetingsSDKAdapter();
  });

  afterEach(() => {
    meetingsSDKAdapter = null;
  });

  describe('display()', () => {
    test('returns the display data in a proper shape', (done) => {
      meetingsSDKAdapter.meetingControls['mute-audio'].display(meetingID).pipe(first())
        .subscribe((dataDisplay) => {
          expect(dataDisplay).toMatchObject({
            ID: 'mute-audio',
            type: 'TOGGLE',
            icon: 'microphone-muted_28',
            state: 'disabled',
            text: 'No microphone',
          });
          done();
        });
    });

    test('emits an error if the meeting does not exist', (done) => {
      meetingsSDKAdapter.meetingControls['mute-audio'].display('inexistent').subscribe(
        () => {},
        (error) => {
          expect(error.message).toBe('Could not find meeting with ID "inexistent"');
          done();
        },
      );
    });
  });

  describe('action()', () => {
    test('calls handleLocalAudio() SDK adapter method', async () => {
      meetingsSDKAdapter.handleLocalAudio = jest.fn();
      await meetingsSDKAdapter.meetingControls['mute-audio'].action(meetingID);
      expect(meetingsSDKAdapter.handleLocalAudio).toHaveBeenCalledTimes(1);
      expect(meetingsSDKAdapter.handleLocalAudio).toHaveBeenCalledWith(meetingID);
    });
  });
});
