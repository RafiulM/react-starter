/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "../components/LandingPage";

export const Route = createFileRoute("/")({
  component: LandingPage,
});
