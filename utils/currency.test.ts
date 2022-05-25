/**
 * Copyright 2022 Synchronous Technologies Pte Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { parseCurrency } from "./currency";

test("parseCurrency", () => {
  expect(parseCurrency(0)).toBe(0);
  expect(parseCurrency(1)).toBe(100);
  expect(parseCurrency(1.25)).toBe(125);
  expect(parseCurrency(1.5)).toBe(150);
  expect(parseCurrency(1.75)).toBe(175);
  expect(parseCurrency(1.12345)).toBe(112);
  expect(parseCurrency(10000)).toBe(1000000);

  expect(parseCurrency(-1)).toBe(-100);
  expect(parseCurrency(-1.25)).toBe(-125);
  expect(parseCurrency(-1.5)).toBe(-150);
  expect(parseCurrency(-1.75)).toBe(-175);
  expect(parseCurrency(-1.12345)).toBe(-112);
  expect(parseCurrency(-10000)).toBe(-1000000);
});
