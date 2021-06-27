/* global test, expect, describe, jest, beforeEach, afterEach */
import { mount } from "@vue/test-utils";
import Board from "./Board.vue";
import PuntoCard from "./PuntoCard.vue";
import io from "socket.io-client";

let mockSocket, endpoint;

jest.mock("socket.io-client", () => {
  const mSocket = {
    emit: jest.fn(),
    on: jest.fn(),
  };
  return jest.fn(() => mSocket);
});

const EMPTY_BOARD = [
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
];

const SAMPLE_BOARD = [
  [null, null, null, null, null, null],
  [null, { color: "red", option: "one_dot_card" }, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, { color: "green", option: "five_dot_card" }, null, null, null],
];

describe.only("Board", () => {
  beforeEach(() => {
    endpoint = "localhost:3000";
    mockSocket = io(endpoint);
  });

  afterEach(() => jest.clearAllMocks());

  test("should render empty board when receiving empty board from socket server", async () => {
    const wrapper = mount(Board, {
      props: {
        socket: mockSocket,
      },
    });

    expect(mockSocket.on).toHaveBeenCalledTimes(1);
    expect(mockSocket.on.mock.calls[0][0]).toEqual("SendBoardFromServer");

    mockSocket.on.mock.calls[0][1](EMPTY_BOARD);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.board).toEqual(EMPTY_BOARD);
    expect(wrapper.findAll(".board__row").length).toBe(6);
    expect(wrapper.findAll(".board__cell").length).toBe(36);
    expect(wrapper.findAllComponents(PuntoCard).length).toBe(0);
  });

  test("should render board with two cards when receiving a board from socket server", async () => {
    const wrapper = mount(Board, {
      props: {
        socket: mockSocket,
      },
    });

    expect(mockSocket.on).toHaveBeenCalledTimes(1);
    expect(mockSocket.on.mock.calls[0][0]).toEqual("SendBoardFromServer");

    mockSocket.on.mock.calls[0][1](SAMPLE_BOARD);

    await wrapper.vm.$nextTick();

    expect(wrapper.findAllComponents(PuntoCard).length).toBe(2);
    expect(wrapper.vm.board).toEqual(SAMPLE_BOARD);
    expect(wrapper.findAll(".board__cell")[7].html()).toContain("puntoCard");
    expect(wrapper.findAll(".board__cell")[32].html()).toContain("puntoCard");
  });

  test("should show punto card when board cell has been clicked", async () => {
    const wrapper = mount(Board, {
      props: {
        option: "three_dot_card",
        color: "red",
        socket: mockSocket,
      },
    });

    expect(mockSocket.on.mock.calls[0][0]).toEqual("SendBoardFromServer");

    mockSocket.on.mock.calls[0][1](EMPTY_BOARD);

    await wrapper.findAll(".board__cell")[0].trigger("click");
    await wrapper.vm.$nextTick();

    expect(mockSocket.on).toHaveBeenCalledTimes(2);
    expect(mockSocket.on.mock.calls[1][0]).toEqual("SendBoardFromServer");
    expect(mockSocket.emit.mock.calls[0][0]).toEqual("SendBoardFromClient");

    expect(wrapper.findAllComponents(PuntoCard).length).toBe(1);
    expect(wrapper.vm.board[0][0]).toEqual({
      color: "red",
      option: "three_dot_card",
    });
    expect(wrapper.findAll(".board__cell")[0].html()).toContain("puntoCard");
  });
});
