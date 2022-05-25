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

export const parseCurrency = (value: number): number => {
  if (isNaN(value)) {
    return 0;
  }

  // Check if the value is a int
  if (Number.isInteger(value)) {
    return value * 100;
  }

  const fixed = parseFloat(value.toFixed(2));
  return Math.round(fixed * 100);
};
