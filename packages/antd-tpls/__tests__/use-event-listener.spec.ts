import { renderHook } from '@testing-library/react-hooks';
import { useEventListener } from '@/lib/use-event-listener';
import { fireEvent, screen } from '@testing-library/react';

describe('useEventListener()', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="test"><button>Hi</button><span id="res"></span></div>';
  });

  test('should bind element when element provide', () => {
    const hiElement = document.querySelector('#test button') as HTMLButtonElement;
    const handler = () => {
      document.querySelector('#res')!.innerHTML = 'res';
    };
    renderHook(() => useEventListener('click', handler, hiElement));
    fireEvent.click(hiElement);
    expect(document.querySelector('#res')!.innerHTML).toBe('res');
  });

  test('should bind windown when element not provide', () => {
    const hiElement = document.querySelector('#test button') as HTMLButtonElement;
    const handler = () => {
      document.querySelector('#res')!.innerHTML = 'res-window';
    };
    renderHook(() => useEventListener('click', handler));
    fireEvent.click(document);
    expect(document.querySelector('#res')!.innerHTML).toBe('res-window');
  });

  test('should unbind the event listener from the window after the hook is unmounted', () => {
    // Act
    const { unmount } = renderHook(() => useEventListener('click', jest.fn()));
    unmount();
    fireEvent.click(document);

    // Assert
    expect(jest.fn()).not.toBeCalled();
    expect(document.querySelector('#res')!.innerHTML).toBe('');
  });
});
