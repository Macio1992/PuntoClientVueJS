/* global test, expect, jest, afterEach */
import { mount } from '@vue/test-utils';
import App from './App.vue';
import io from "socket.io-client";

jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
		on: jest.fn()
  };
  return jest.fn(() => mSocket);
});

afterEach(() => jest.clearAllMocks());

test('should render App component and set socket io connection on start', async () => {
		const endpoint = 'localhost:3000';
    const mockSocket = io(endpoint);

		const wrapper = mount(App);
    expect(wrapper.html()).toContain('Maciej');

		expect(mockSocket.on).toHaveBeenCalledTimes(1);

    wrapper.find('button').trigger('click');
		expect(mockSocket.emit).toHaveBeenCalledWith('JoinGame');
		expect(mockSocket.emit).toHaveBeenCalledTimes(1);
		expect(mockSocket.on).toHaveBeenCalledTimes(2);
    expect(mockSocket.on.mock.calls[0][0]).toEqual('SendPlayers');
});
