/* global test, expect, jest, afterEach, beforeEach, describe */
import { mount, config } from "@vue/test-utils";
import Game from "./Game.vue";
import io from "socket.io-client";

jest.mock("socket.io-client", () => {
  const mSocket = {
    emit: jest.fn(),
    on: jest.fn(),
  };
  return jest.fn(() => mSocket);
});

let mockSocket, endpoint;
const FAKE_PLAYERS = [
  { id: "id_1", color: "red" },
  { id: "id_2", color: "blue" },
];

describe("Game", () => {
  beforeEach(() => {
    endpoint = "localhost:3000";
    mockSocket = io(endpoint);
    config.global.mocks["$socketio"] = mockSocket;
    config.global.mocks["$testMode"] = true;
  });

  afterEach(() => jest.clearAllMocks());

  test("should render Game component, connect to socket io client and retrieve no players on start", async () => {
    const wrapper = mount(Game);
    expect(wrapper.html()).toBeTruthy();

    expect(mockSocket.on).toHaveBeenCalledTimes(1);
    expect(mockSocket.on.mock.calls[0][0]).toEqual("SendPlayers");

    mockSocket.on.mock.calls[0][1]([]);
    expect(wrapper.vm.players).toEqual([]);

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".joinButton")).toBeTruthy();
    expect(wrapper.findAll(".player").length).toBe(0);
  });

  test("should render Game component, connect to socket io client and retrieve some players on start", async () => {
    const wrapper = mount(Game);
    expect(wrapper.html()).toBeTruthy();

    expect(mockSocket.on).toHaveBeenCalledTimes(1);
    expect(mockSocket.on.mock.calls[0][0]).toEqual("SendPlayers");

    mockSocket.on.mock.calls[0][1](FAKE_PLAYERS);
    expect(wrapper.vm.players).toEqual(FAKE_PLAYERS);

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(".player").length).toBe(2);
    expect(wrapper.findAll(".player")[0].attributes().class).toContain(FAKE_PLAYERS[0].color);
    expect(wrapper.findAll(".player")[1].attributes().class).toContain(FAKE_PLAYERS[1].color);
  });

  test("should emit joining to the game and retrieve joined players on button click", async () => {
    const wrapper = mount(Game);

    await wrapper.find(".joinButton").trigger("click");
    expect(mockSocket.emit).toHaveBeenCalledTimes(1);
    expect(mockSocket.emit).toHaveBeenCalledWith("JoinGame");

    expect(mockSocket.on).toHaveBeenCalledTimes(3);
    expect(mockSocket.on.mock.calls[0][0]).toEqual("SendPlayers");
    expect(mockSocket.on.mock.calls[1][0]).toEqual("SendPlayers");
    expect(mockSocket.on.mock.calls[2][0]).toEqual("SendPlayerColor");

    mockSocket.on.mock.calls[1][1](FAKE_PLAYERS);

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(".player").length).toBe(2);
    expect(wrapper.vm.players).toEqual(FAKE_PLAYERS);
    expect(wrapper.findAll(".player")[0].attributes().class).toContain(
      FAKE_PLAYERS[0].color
    );
    expect(wrapper.findAll(".player")[1].attributes().class).toContain(
      FAKE_PLAYERS[1].color
    );
    expect(wrapper.vm.player.playerJoined).toBe(true);

    mockSocket.on.mock.calls[2][1]("red");
    expect(wrapper.vm.player.playerColor).toBe("red");
  });

  test("should hide join button when user has joined the game", async () => {
    const wrapper = mount(Game);

    expect(wrapper.findAll(".joinButton").length).toBe(1);

    await wrapper.find(".joinButton").trigger("click");
    mockSocket.on.mock.calls[1][1](FAKE_PLAYERS);

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(".joinButton").length).toBe(0);
  });
});
