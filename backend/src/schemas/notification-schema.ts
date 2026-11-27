import { z } from "zod";

// 주소에서 받은 ID를 검증해 잘못된 값이 DB로 넘어가는 것을 막는다.
// 십진수 문자열을 숫자로 변환한 뒤 DB의 Int 범위에 드는 양의 정수만 통과시킨다.
export const notificationParamsSchema = z.object({
  id: z
    .string()
    .regex(/^[0-9]+$/)
    .transform(Number)
    .pipe(z.int32().positive()),
});
