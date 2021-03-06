
$$p( t ) = 200m - ( 4.9 m/s^2 ) * t^2$$

# 1.1.1

$$\begin{align}
  p(3 s) &= \begin{aligned}[t] &
    200m - (4.9 m/s^2) (3 s)^2
  \end{aligned}\\
  &= \begin{aligned}[t] &
    155.9 m
  \end{aligned}
\end{align}$$

$$\begin{align}
  p(5 s) &=
  \begin{aligned}[t] &
    200m - (4.9 m/s^2) (5 s)^2
  \end{aligned}\\ &= \begin{aligned}[t] &
    77.5 m
  \end{aligned}
\end{align}$$

p(3 s) represents the height of the height of the object three seconds after being dropped. p(5 s) represents the height of the height of the object five seconds after being dropped.

# 1.1.2

$$
  \frac{p(5s) − p(3s)}{5s − 3s} = -39.2 m/s^2
$$

The result represents the object's average velocity between time 3s and 5s.

# 1.1.3

$$\begin{align}
  \frac
    {p(t_1) - p(t_0)}
    {t_1 - t_0}
  &=
  \begin{aligned}[t]
    \frac
      {( 200 - 4.9 t_1^2 ) - ( 200 - 4.9 t_0^2 )}
      {t_1 - t_0}

  \end{aligned}\\ &= \begin{aligned}[t]
    \frac
      {-4.9 t_1^2 + 4.9 t_0^2}
      {t_1 - t_0}

  \end{aligned}\\ &= \begin{aligned}[t]
    \frac
      {-4.9 ( t_1^2 - t_0^2 )}
      {t_1 - t_0}

  \end{aligned}\\ &= \begin{aligned}[t]
    \frac
      {-4.9 ( t_1 + t_0 ) ( t_1 - t_0 )}
      {t_1 - t_0}

  \end{aligned}\\ &= \begin{aligned}[t]
    -4.9 ( t_1 + t_0 )

  \end{aligned}\\ &= \begin{aligned}[t]
    -4.9t_1 - 4.9t_0

  \end{aligned}
\end{align}$$

That's neat.

$$
  g(t_0, t_1) = −4.9t_1 − 4.9t_0
$$

# 1.1.4

$$
    \frac
      {p(5s) − p(3s)}
      {( 5s − 3s )}
  =
    -39.2 m/s
$$
$$\begin{align}

-4.9 * 5 - 4.9 * 3 &=
  \begin{aligned}[t]
    -4.9 * 5 - 4.9 * 3

  \end{aligned}\\ &= \begin{aligned}[t]
    -39.2

  \end{aligned}
\end{align}$$

# 1.1.5

| $t_1 / s$    | $g(3, t_1) / (m/s)$ |
| :----------- | :---------------- |
| 2.9          | -28.91            |
| 2.99         | -29.351           |
| 2.999        | -29.3951          |
| 2.999999999  | -29.3999999951    |
| 3.0000000001 | -29.4000000005    |
| 3.001        | -29.4049          |
| 3.01         | -29.449           |
| 3.1          | -29.89            |

# 1.1.6

Values for $g(3 s, t_1)$ seem to converge on $-29.4 m/s$ as $t_1$ approaches 3. That must be the instantaneous velocity when $t = 3 s$.
